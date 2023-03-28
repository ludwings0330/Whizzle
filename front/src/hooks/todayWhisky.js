import presetWhisky from "../constants/presetWhisky";

export function todayWhisky() {
  const today = new Date();
  const day = today.getDate();
  return presetWhisky[day];
}
