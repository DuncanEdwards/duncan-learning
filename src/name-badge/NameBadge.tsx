import style from "./NameBadge.module.css";

export const NameBadge = () => {
  return (
    <div>
      <h1>This is a badge</h1>
      <div className={style.main}>This is a description</div>
      <button className={style.button}>Press me</button>
    </div>
  );
};
