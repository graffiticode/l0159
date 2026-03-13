<!-- SPDX-License-Identifier: CC-BY-4.0 -->
# L0159 Vocabulary

This specification documents dialect-specific functions available in the
**L0159** language of Graffiticode. These functions extend the core language
with functionality for building flashcard and memory card games.

The core language specification including the definition of its syntax,
semantics and base library can be found here:
[Graffiticode Language Specification](./graffiticode-language-spec.html)

## Functions

| Function | Signature | Description |
| :------- | :-------- | :---------- |
| `flashcards` | `<record record: record>` | Creates a flashcard game from facts |
| `match` | `<record record: record>` | Creates a matching card game from facts |
| `memory` | `<record record: record>` | Creates a memory card game from facts |
| `facts` | `<list: record>` | Defines a list of fact pairs for card games |
| `title` | `<string record: record>` | Sets the title for a card game |
| `instructions` | `<string record: record>` | Sets instructions for a card game |
| `img` | `<string: record>` | Creates an image element from data |

### flashcards

Creates a flashcard game where cards show a fact on the front and its
matching fact on the back.

```
flashcards facts [["front 1" "back 1"] ["front 2" "back 2"]] {}..
```

### match

Creates a matching card game where players match pairs of related facts.

```
match facts [["term 1" "definition 1"] ["term 2" "definition 2"]] {}..
```

### memory

Creates a memory card game where players flip cards to find matching pairs.
Cards show facts on the front and letter identifiers on the back.

```
memory facts [["pair A front" "pair A back"] ["pair B front" "pair B back"]] {}..
```

### facts

Defines a list of fact pairs used by card game functions. Each fact is a
two-element list of related items.

```
facts [["2 + 2" "4"] ["3 + 3" "6"]]
```

### title

Sets the title for a card game. The title is rendered as LaTeX text.

```
title "Math Facts" flashcards facts [["2+2" "4"]] {}..
```

### instructions

Sets the instructions for a card game. Instructions are rendered as LaTeX text.

```
instructions "Match each term with its definition" match facts [["term" "def"]] {}..
```

### img

Creates an image element from base64-encoded data or a URL.

```
img "data:image/png;base64,..."
```

## Program Examples

Create a flashcard game with a title and instructions:

```
title "Vocabulary"
  instructions "Flip each card to see the definition"
    flashcards facts [
      ["photosynthesis" "process by which plants convert light to energy"]
      ["mitosis" "cell division producing two identical cells"]
    ] {}..
```
