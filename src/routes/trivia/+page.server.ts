import { readyCheck } from "./questions.sever";


export function load() {
  return {
    question: readyCheck,
	className: "trivia"
  };
}