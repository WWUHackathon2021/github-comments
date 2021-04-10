import { makeBadge } from "badge-maker";
import { none, some } from "fp-ts/lib/Option";

export default function makeRepositoryBadge(numComments: number) {
  try {
    return some(
      makeBadge({
        label: "comments",
        color: "dodgerblue",
        message: `${numComments}`,
        style: "flat",
      })
    );
  } catch (e) {
    return none;
  }
}
