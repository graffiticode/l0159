<!-- SPDX-License-Identifier: CC-BY-4.0 -->
# Dialect L0159 Specific Instructions

L0159 is a Graffiticode dialect for building flashcard and memory card games.
It compiles programs into card game configurations rendered via a React frontend
with LaTeX math support.

## L0159 Specific Guidelines

- Use `flashcards` for study cards that flip to reveal answers
- Use `match` for games where players match related pairs
- Use `memory` for games where players find hidden matching pairs
- Always wrap card content with `facts` to define the fact pairs
- Use `title` and `instructions` to add context to card games
- Facts are two-element lists: `["front" "back"]`
- Text content supports LaTeX math notation (e.g., `"$x^2$"`)
- Use `img` to embed images in card content

## Example Patterns

- Simple flashcards:
  ```
  flashcards facts [["term" "definition"]] {}..
  ```
- Titled match game:
  ```
  title "Math Facts"
    match facts [["2+2" "4"] ["3+3" "6"]] {}..
  ```
- Memory game with instructions:
  ```
  instructions "Find the matching pairs"
    memory facts [["A" "1"] ["B" "2"]] {}..
  ```
