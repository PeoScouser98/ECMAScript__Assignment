import { $ } from "./common";

const toggleLoading = ({ selector, isDone }) => {
    const element = $(selector);
    if (element)
        element.innerHTML = isDone ? element.dataset.text : /* html */ `<div class="loader"></div><span class="indent-2">Await ...</span>`;

};
export default toggleLoading;
