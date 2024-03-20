import { useState } from "react";
import { Reorder } from "framer-motion";
import "./TodoApp.css";

function ToDoApp() {
  const [todo, setTodo] = useState([]);
  const [id, setId] = useState(0);
  const [tytul, setTytul] = useState("");
  const [opis, setOpis] = useState("");
  const [daily, setDaily] = useState(false);
  const [kategoria, setKategoria] = useState("");

  function handleTytul(e) {
    setTytul(e.target.value);
  }
  function handleOpis(e) {
    setOpis(e.target.value);
  }
  function handleDaily() {
    setDaily(!daily);
  }
  const handleKategoria = (event) => {
    setKategoria(event.target.value);
  };

  function addTodo() {
    setTodo((t) => [
      ...t,
      { id: id, tytul: tytul, opis: opis, daily: daily, kategoria: kategoria },
    ]);

    setId(id + 1);

    setTytul("");
    setOpis("");
    setDaily(false);
    setKategoria("");
  }

  function deleteTodo(id) {
    setTodo(todo.filter((item) => item.id !== id));
  }

  function handleReorder(reorderedItems) {
    setTodo(reorderedItems);
  }
  return (
    <div className="page">
      <div className="dodawacz">
        <input
          className="tytul"
          value={tytul}
          type="text"
          placeholder="Tytuł"
          onChange={handleTytul}
        />
        <textarea
          value={opis}
          type="text"
          placeholder="Opis zadania"
          onChange={handleOpis}
        />
        <div className="check">
          Daily?
          <input checked={daily} type="checkbox" onChange={handleDaily} />
        </div>
        <label className="kat">
          Kategoria:&nbsp;
          <select value={kategoria} onChange={handleKategoria}>
            <option value="Praca">Praca</option>
            <option value="Osobiste">Osobiste</option>
            <option value="Zakupy">Zakupy</option>
            <option value="Sport">Sport</option>
          </select>
        </label>
        <button onClick={addTodo} className="dodaj">
          Dodaj zadanie
        </button>
      </div>
      <div className="wyswietlacz">
        <Reorder.Group
          className="reorder-list"
          values={todo}
          onReorder={handleReorder}
        >
          <h2>Todo List</h2>
          <p>
            {" "}
            {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
            <span className="koment">// Można przęciągać zadania myszką</span>
          </p>
          {todo.map((todo) => (
            <Reorder.Item className="reorder-item" key={todo.id} value={todo}>
              <span className="reorder-handle">
                <div className="srodek">
                  <b>{todo.tytul}</b>
                  <p> {todo.opis}</p>
                  <p> {todo.daily ? " ✅ Daily" : " ❎ Nie daily "}</p>
                  <p>{todo.kategoria}</p>
                  <button className="usun" onClick={() => deleteTodo(todo.id)}>
                    Usuń zadanie
                  </button>
                </div>
              </span>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
}

export default ToDoApp;
