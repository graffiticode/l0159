/* Copyright (c) 2023, ARTCOMPILER INC */
import {
  Checker as BasisChecker,
  Transformer as BasisTransformer,
  Compiler as BasisCompiler
} from '@graffiticode/basis';

const shuffle = unshuffled =>
    unshuffled.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

const source = 'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80';

const cardsFromFacts = facts =>
      shuffle(facts.map((fact, index) => [{
        id: index * 2,
        factId: index,
        back: source,
        face: fact[0],
      }, {
        id: index * 2 + 1,
        factId: index,
        back: source,
        face: fact[1],
      }]).flat());

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
