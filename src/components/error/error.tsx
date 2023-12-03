type ErrorProps = { error: string };

export function Error(props: ErrorProps) {
  return (
    <p className="text text_type_main-large">
      {" "}
      Произошла ошибка: {props.error}
    </p>
  );
}
