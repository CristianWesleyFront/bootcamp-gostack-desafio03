import React, { useState, useEffect } from "react";
import Api from "./services/api";
import "./styles.css";

import Card from "./components/Card";

function App() {
  const [projects, setprojects] = useState([]);

  useEffect(() => {
    Api.get("/repositories").then((response) => {
      setprojects(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const { data } = await Api.post("/repositories", {
      title: `new project ${new Date().getTime()}`,
      url: "bootcamp-gostack-desafio012313",
      techs: ["NodeJs", "JavaScript"],
    });

    await setprojects([...projects, data]);
  }

  async function handleRemoveRepository(id) {
    const { status } = await Api.delete(`/repositories/${id}`);

    if (status == 204) {
      const projectIndex = await projects.findIndex((e) => e.id === id);

      let projectArray = projects;

      await projectArray.splice(projectIndex, 1);

      await setprojects([...projectArray]);
    }
  }

  return (
    <div className="App">
      <Card>
        <ul data-testid="repository-list">
          {projects.map((element) => (
            <li data-testid="repository-list-li" key={element.id}>
              {element.title}
              <button onClick={() => handleRemoveRepository(element.id)}>
                Remover
              </button>
            </li>
          ))}
        </ul>

        <button onClick={handleAddRepository}>Adicionar</button>
      </Card>
    </div>
  );
}

export default App;
