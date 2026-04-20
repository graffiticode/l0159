<!-- SPDX-License-Identifier: CC-BY-4.0 -->
# L0159 User Guide

Agent-facing guide for authoring flashcard and card-game items in L0159. Read this before composing a `create_item` prompt or an `update_item` modification.

## Overview

L0159 is an authoring language for **flashcard and memory-style card games** — interactive items where a list of "fact pairs" drives one of three gameplay modes: flashcards that flip to reveal an answer, matching games where players pair related terms, and memory games where players flip hidden cards to find pairs. Input is a natural-language description of the deck (the subject, the fact pairs, optional title and instructions); output is an L0159 program whose compiled value is a configured card-game item that the renderer draws and plays. Every program is one of `flashcards`, `match`, or `memory` operating on a `facts` list of two-element `["front" "back"]` pairs, optionally wrapped with `title` and `instructions`. Text supports LaTeX math (e.g. `"$x^2$"`), so L0159 is equally at home with vocabulary, historical dates, or math fluency drills. It is the right tool when the job is "a studyable deck of two-sided cards"; it is not a full assessment engine (use L0158 for scored questions), a spaced-repetition scheduler, or a freeform board (use L0172).

When composing a request, name the game mode first — flashcards for self-study, match for term-to-definition pairing, memory for concentration-style pair-finding — then the subject and fact pairs, then optional `title` and `instructions` text. The `facts` argument is always a list of two-element lists: `facts [["front 1" "back 1"] ["front 2" "back 2"]]`. Wrap title and instructions on the outside of the mode call: `title "Vocab" instructions "Flip to reveal" flashcards facts [...] {}..`. The trailing `{}` is the empty configuration record — include it on every mode call. Image cards use `img "URL-or-data-URI"` as the card content. Every L0159 program terminates with `..`.

In scope: three card-game modes (flashcards, match, memory); two-sided fact pairs with text or LaTeX-rendered content; image cards via `img`; optional title and instructions headers; decks of any size from 1 pair to several dozen. Out of scope: scored assessments and rubrics (use L0158), spaced-repetition scheduling or progress tracking, dynamic deck generation from external sources, freeform diagrams or boards (use L0172), and games that aren't the flip-to-reveal / match-pairs / memory-pair-find pattern.

## Vocabulary Cues

Say this to get that:

- **Flashcards** — `flashcards facts [...] {}`. Self-study cards that flip between a front and back. "Make flashcards for..."
- **Match** — `match facts [...] {}`. Players pair fronts with their matching backs, scrambled. "Build a matching game with..."
- **Memory** — `memory facts [...] {}`. Concentration-style: all cards face down, flip two at a time to find pairs. "Create a memory game where..."
- **Facts** — `facts [["front" "back"] ...]`. The deck. Each fact is a two-element list. "These are the pairs: ...".
- **Title** — `title "Vocabulary"`. Header above the deck. "Title it 'Math Facts'".
- **Instructions** — `instructions "Flip each card to reveal the answer."`. Subheader shown to players. "With the instruction ...".
- **Image cards** — `img "https://..."` or `img "data:image/png;base64,..."`. Use in place of a text string inside a fact pair. "The front is the image at X, the back is 'dog'".
- **LaTeX math** — wrap math in `$...$`. "The front is $x^2$, the back is 'x squared'" → `["$x^2$" "x squared"]`.
- **Empty config** — every mode call ends with `{}` before `..`. Don't drop it.
- **Program terminator** — every L0159 program ends with `..`.

## Example Prompts

- *"Make a flashcard deck titled 'Spanish Vocab' with five pairs: hola/hello, adiós/goodbye, por favor/please, gracias/thank you, agua/water."* → `flashcards_deck`
- *"Build a matching game titled 'State Capitals' with the instruction 'Match each state to its capital.' Pairs: California/Sacramento, Texas/Austin, Florida/Tallahassee, New York/Albany, Illinois/Springfield."* → `match_game`
- *"Memory game 'Times Tables' with the prompt 'Find the pairs that compute to the same value.' Pairs: 2×6 / 12, 3×4 / 12, 5×2 / 10, 10×1 / 10."* → `memory_game`
- *"Flashcards for LaTeX-rendered math: $x^2 + 2x + 1$ / $(x+1)^2$; $a^2 - b^2$ / $(a+b)(a-b)$; $\\sin^2 x + \\cos^2 x$ / $1$."* → `flashcards_deck`
- *"Match game for biology vocab: photosynthesis / process by which plants convert light to energy; mitosis / cell division producing two identical cells; osmosis / movement of water across a semipermeable membrane; respiration / process that releases energy from glucose."* → `match_game`
- *"Memory game titled 'Flags and Countries' using image cards on one side and country names on the other, for France, Japan, Brazil, Egypt, and Canada."* → `memory_game`

## Out of Scope

- **Scored assessments** — no rubrics, answer keys, or scoring beyond built-in match/memory feedback. Use L0158 for graded items.
- **Spaced repetition** — L0159 configures a deck; it does not schedule reviews or track retention.
- **Dynamic deck generation** — the fact list is literal in the program; L0159 does not fetch cards from a data source at runtime.
- **Freeform diagrams or boards** — use L0172 for board-style layouts.
- **Games beyond flashcards / match / memory** — trivia, multiple-choice quizzes, word searches, crosswords belong elsewhere.
- **Card ordering / shuffling controls** — order is up to the renderer; L0159 emits the deck, not the shuffle policy.
