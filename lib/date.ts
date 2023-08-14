import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.locale(ptBr);
dayjs.extend(relativeTime);
dayjs.extend(isSameOrBefore);

export const maxDate = (date: (string | null)[]) => {
  // @ts-expect-error
  const formattedDate = date.map((d) => new Date(d.due));

  const maxDate = dayjs(
    new Date(Math.max(...formattedDate.map(Number))),
  ).format("D[/]MM[/]YYYY");

  return maxDate;
};

export const minDate = (date: (string | null)[]) => {
  // @ts-expect-error
  const formattedDate = date.map((d) => new Date(d.due));

  const minDate = dayjs(
    new Date(Math.min(...formattedDate.map(Number))),
  ).format("D[/]MM[/]YYYY");

  return minDate;
};

export const formattedDate = (date: Date | string | null) =>
  dayjs(date).format("DD[/]MM[/]YYYY");

export const isBeforeOrSameNow = (date: string) =>
  dayjs(new Date(date)).isSameOrBefore(dayjs(new Date()), "day");

export const isAfterNow = (date: string) =>
  dayjs(new Date(date)).isAfter(dayjs(new Date()), "day");
