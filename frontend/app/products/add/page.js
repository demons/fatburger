"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [title, setTitle] = useState("");
  const [maker, setMaker] = useState("");
  const [energy, setEnergy] = useState("");
  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");
  const [carb, setCarb] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    let { value, type } = e.target;

    if (type.toLowerCase() === "number") {
      value = value.replace(",", ".");
    }

    switch (e.target.name) {
      case "title":
        {
          setTitle(value);
        }
        break;
      case "maker":
        {
          setMaker(value);
        }
        break;
      case "energy":
        {
          setEnergy(value);
        }
        break;
      case "protein":
        {
          setProtein(value);
        }
        break;
      case "fat":
        {
          setFat(value);
        }
        break;
      case "carb":
        {
          setCarb(value);
        }
        break;
    }
  };

  const handleCancel = () => {
    router.push(`/products`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Название</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="maker">Производитель</label>
        <input
          type="text"
          name="maker"
          id="maker"
          value={maker}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="energy">Калории</label>
        <input
          type="number"
          name="energy"
          id="energy"
          value={energy}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="protein">Белки</label>
        <input
          type="number"
          name="protein"
          id="protein"
          value={protein}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="fat">Жиры</label>
        <input
          type="number"
          name="fat"
          id="fat"
          value={fat}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="carb">Углеводы</label>
        <input
          type="number"
          name="carb"
          id="carb"
          value={carb}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Добавить</button>
      <button type="button" onClick={handleCancel}>
        Отмена
      </button>
    </form>
  );
}
