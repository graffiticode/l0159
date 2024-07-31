/* Copyright (c) 2023, ARTCOMPILER INC */
import {
  Checker as BasisChecker,
  Transformer as BasisTransformer,
  Compiler as BasisCompiler
} from '@graffiticode/basis';

const cardsFromFacts = facts =>
      facts.map((fact, index) => [{
        id: index * 2,
        factId: index,
        face: fact[0],
        back: "",
      }, {
        id: index * 2 + 1,
        factId: index,
        face: fact[1],
        back: "",
      }]).flat();

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

  CONCENTRATION(node, options, resume) {
    this.visit(node.elts[0], options, async (e0, v0) => {
      this.visit(node.elts[1], options, async (e1, v1) => {
        const data = options?.data || {};
        const err = [];
        const val = {
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
      const err = [];
      const val = {
        cards: cardsFromFacts(v0),
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
