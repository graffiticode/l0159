// SPDX-License-Identifier: MIT
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Form } from "./components";
import { createState } from "./lib/state";
import { compile, getData } from './swr/fetchers';
import './index.css';

// The compiled data field can be a record, a non-empty array, or a bare value
// (number, string). Render whenever there is something to show.
function hasRenderableData(data) {
  if (data === null || data === undefined) {
    return false;
  }
  if (typeof data === "object") {
    return Object.keys(data).length > 0;
  }
  return true;
}

// Compile/stored responses use the standard { data, errors } envelope. A
// response carrying a `data` and/or `errors` field is read as an envelope; a
// payload with neither (legacy/raw value or host-provided init data) is used
// as the data model itself.
function unwrapEnvelope(resp) {
  if (
    resp && typeof resp === "object" && !Array.isArray(resp) &&
    ("data" in resp || "errors" in resp)
  ) {
    return {
      data: resp.data,
      errors: Array.isArray(resp.errors) ? resp.errors : [],
    };
  }
  return { data: resp, errors: [] };
}

const shuffle = unshuffled =>
    unshuffled.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

const cardsFromFacts = facts =>
      facts.map(fact => [{
        title: fact[0], text: fact[0]
      }, {
        title: fact[1], text: fact[1]
      }]).flat();

export const View = () => {

  // Report content height to an embedding parent (e.g. the MCP/ChatGPT inline
  // widget iframe) so it can size the iframe to the form instead of a fixed
  // guess. Posts to "*" because the embedding widget is often a sandboxed
  // origin; the parent validates event.source. Learnosity relayouts async, so a
  // ResizeObserver keeps the height live.
  useEffect(() => {
    if (typeof window === "undefined" || window.parent === window) return;
    const postHeight = () => {
      const h = document.body.scrollHeight;
      if (h > 0) window.parent.postMessage({ type: "resize", height: h }, "*");
    };
    const ro = new ResizeObserver(postHeight);
    ro.observe(document.body);
    postHeight();
    return () => ro.disconnect();
  }, []);
  const [ id, setId ] = useState();
  const [ accessToken, setAccessToken ] = useState();
  const [ targetOrigin, setTargetOrigin ] = useState();
  const [ doGetData, setDoGetData ] = useState(true);
  const [ recompile, setRecompile ] = useState(false);
  const [ height, setHeight ] = useState(0);

  const [ state ] = useState(createState({}, (data, { type, args }) => {
    console.log("L0159 state.apply() type=" + type + " args=" + JSON.stringify(args, null, 2));
    switch (type) {
    case "init":
      return {
        ...args,
      };
    case "compile":
      // A record merges into existing state; a non-record result (number,
      // string, list) replaces it.
      if (typeof args === "object" && args !== null && !Array.isArray(args)) {
        return {
          ...data,
          ...args,
        };
      }
      return args;
    case "update":
      setRecompile(false);
      return {
        ...data,
        ...args,
      };
    default:
      console.error(false, `Unimplemented action type: ${type}`);
      return data;
    }
  }));

  useEffect(() => {
    if (window.location.search) {
      const params = new URLSearchParams(window.location.search);
      setId(params.get("id"));
      const accessToken = params.get("access_token");
      setAccessToken(accessToken);
      setTargetOrigin(params.get("origin"));
      const data = params.get("data");
      if (data) {
        state.apply({
          type: "init",
          args: JSON.parse(data),
        });
      }
    }
  }, [window.location.search]);

  useEffect(() => {
    // If `id` changes, then recompile.
    if (id) {
      setDoGetData(true);
    }
  }, [id]);

  useEffect(() => {
    setRecompile(true);
  }, []);

  // Post onload message when view first renders
  useEffect(() => {
    if (targetOrigin) {
      window.parent.postMessage({ type: "onload", version: state.version, data: state.data }, targetOrigin);
    }
  }, [targetOrigin]);

  // Post state data to parent when it changes
  useEffect(() => {
    if (targetOrigin) {
      window.parent.postMessage(state.data, targetOrigin);
    }
  }, [JSON.stringify(state.data), targetOrigin]);

  const dataResp = useSWR(
    doGetData && id && {
      accessToken,
      id,
    },
    getData
  );

  if (dataResp.data) {
    const { data, errors } = unwrapEnvelope(dataResp.data);
    state.setErrors(errors);
    if (errors.length === 0 && data !== null && data !== undefined) {
      state.apply({
        type: "compile",
        args: data,
      });
    }
    setDoGetData(false);
  }

  const compileResp = useSWR(
    recompile && id && {
      accessToken,
      id,
      data: state.data,
    },
    compile
  );

  if (compileResp.data) {
    const { data, errors } = unwrapEnvelope(compileResp.data);
    state.setErrors(errors);
    if (errors.length === 0 && data !== null && data !== undefined) {
      state.apply({
        type: "compile",
        args: data,
      });
    }
    setRecompile(false);
  }

  return (
    (hasRenderableData(state.data) || state.errors.length > 0) &&
      <Form state={state} /> ||
      <div />
  );
}
