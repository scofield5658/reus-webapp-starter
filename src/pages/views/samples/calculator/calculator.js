import $ from "jquery";
import sum from "./sum";

$(() => {
  const $num0 = $("#num0");
  const $num1 = $("#num1");
  const $sum = $("#sum");

  $("#num0, #num1").on("keyup", () => {
    const num0 = $num0.val() - 0;
    const num1 = $num1.val() - 0;

    $sum.val(sum(num0, num1));
  });
});
