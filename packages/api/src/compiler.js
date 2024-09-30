/* Copyright (c) 2023, ARTCOMPILER INC */
import {
  Checker as BasisChecker,
  Transformer as BasisTransformer,
  Compiler as BasisCompiler
} from '@graffiticode/basis';

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// match - front and back same fact
// memory - front fact, back letter
// flashcards - front fact, back matching fact
const createBack = ({ type, fact, id, index }) => (
  console.log("createBack() type=" + type + " index=" + index + " fact=" + JSON.stringify(fact, null, 2)),
  type === "match" && fact[index] ||
    type === "memory" && letters[id] ||
    type === "flashcards" && index === 0 && fact[0] ||
    null
);

const createFace = ({ type, fact, index }) => (
  type === "match" && fact[index] ||
    type === "memory" && fact[index] ||
    type === "flashcards" && index === 0 && fact[1] ||
    null
);

const cardPairsFromFacts = (facts, type) => (
  facts.map((fact, index) => [{
    id: index * 2,
    factId: index,
    face: createFace({fact, type, index: 0}),
    back: createBack({fact, type, id: index * 2, index: 0}),
  }, {
    id: index * 2 + 1,
    factId: index,
    face: createFace({fact, type, index: 1}),
    back: createBack({fact, type, id: index * 2 + 1, index: 1}),
  }])
);

export class Checker extends BasisChecker {
  HELLO(node, options, resume) {
    this.visit(node.elts[0], options, async (e0, v0) => {
      const err = [];
      const val = node;
      resume(err, val);
    });
  }
}

export class Transformer extends BasisTransformer {
  HELLO(node, options, resume) {
    this.visit(node.elts[0], options, async (e0, v0) => {
      const data = options?.data || {};
      const err = [];
      const val = {
        ...data,
        hello: data.hello !== undefined ? data.hello : v0,
      };
      resume(err, val);
    });
  }

  FLASHCARDS(node, options, resume) {
    this.visit(node.elts[0], {...options, type: "flashcards"}, async (e0, v0) => {
      this.visit(node.elts[1], options, async (e1, v1) => {
        const data = options?.data || {};
        console.log("FLASHCARDS() data=" + JSON.stringify(data, null, 2));
        const err = [];
        const val = {
          type: "flashcards",
          cardIndex: 0,
          ...v0,
          ...v1,
          ...data,
        };
        resume(err, val);
      });
    });
  }

  MEMORY(node, options, resume) {
    this.visit(node.elts[0], {...options, type: "memory"}, async (e0, v0) => {
      this.visit(node.elts[1], options, async (e1, v1) => {
        const data = options?.data || {};
        const err = [];
        const val = {
          type: "memory",
          ...v0,
          ...v1,
          ...data,
        };
        resume(err, val);
      });
    });
  }

  MATCH(node, options, resume) {
    this.visit(node.elts[0], {...options, type: "match"}, async (e0, v0) => {
      this.visit(node.elts[1], options, async (e1, v1) => {
        const data = options?.data || {};
        const err = [];
        const val = {
          type: "match",
          ...v0,
          ...v1,
          ...data,
        };
        resume(err, val);
      });
    });
  }

  FACTS(node, options, resume) {
    this.visit(node.elts[0], options, async (e0, v0) => {
      const data = options?.data || {};
      const type = options.type
      const err = [];
      const val = {
        facts: v0,
        pairs: cardPairsFromFacts(v0, type),
        ...data,
      };
      resume(err, val);
    });
  }

  IMG(node, options, resume) {
    this.visit(node.elts[0], options, async (e0, v0) => {
      const data = options?.data || {};
      const err = [];
      const val = {
        type: "image",
        data: v0,
        ...data,
      };
      resume(err, val);
    });
  }

  PROG(node, options, resume) {
    this.visit(node.elts[0], options, async (e0, v0) => {
      const data = options?.data || {};
      const err = e0;
      const val = v0.pop();
      resume(err, {
        ...val,
        ...data,
      });
    });
  }
}

export const compiler = new BasisCompiler({
  langID: '0159',
  version: 'v0.0.1',
  Checker: Checker,
  Transformer: Transformer,
});
