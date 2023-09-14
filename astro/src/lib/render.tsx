import Editor from '../Editor.tsx'
import { h, render as preactRender } from 'preact';

export function render(tutorial = null) {
  const root = document.querySelector("main");

  preactRender(<Editor />, root);
}
