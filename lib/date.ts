import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";

dayjs.locale(ptBr);

export const maxDate = (date: (string | null)[]) => {
  // @ts-expect-error
  const formattedDate = date.map((d) => new Date(d));

  const maxDate = dayjs(
    new Date(Math.max(...formattedDate.map(Number))),
  ).format("D[/]MM[/]YYYY");

  return maxDate;
};

export const formattedDate = (date: string) =>
  dayjs(date).format("DD[/]MM[/]YYYY");
