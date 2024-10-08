import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Form } from "./components";
import { createState } from "./lib/state";
import { compile, getData } from './swr/fetchers';
import './index.css';

function isNonNullNonEmptyObject(obj) {
  return (
    typeof obj === "object" &&
      obj !== null &&
      Object.keys(obj).length > 0
  );
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
  const [ id, setId ] = useState();
  const [ accessToken, setAccessToken ] = useState();
  const [ doGetData, setDoGetData ] = useState(true);
  const [ recompile, setRecompile ] = useState(false);
  const [ height, setHeight ] = useState(0);

  const [ state ] = useState(createState({}, (data, { type, args }) => {
    // console.log("L0159 state.apply() type=" + type + " args=" + JSON.stringify(args, null, 2));
    switch (type) {
    case "compiled":
      return {
        ...data,
        ...args,
      };
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

  const dataResp = useSWR(
    doGetData && id && {
      accessToken,
      id,
    },
    getData
  );

  if (dataResp.data) {
    state.apply({
      type: "compiled",
      args: dataResp.data,
    });
    setDoGetData(false);
  }

  const compileResp = useSWR(
    recompile && accessToken && id && {
      accessToken,
      id,
      data: state.data,
    },
    compile
  );

  if (compileResp.data) {
    state.apply({
      type: "compiled",
      args: compileResp.data,
    });
    setRecompile(false);
  }

  return (
    isNonNullNonEmptyObject(state.data) &&
      <Form state={state} /> ||
      <div />
  );
}
