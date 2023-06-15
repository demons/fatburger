function Amount({ items = [] }) {
  const initAmount = {
    energy: 0,
    protein: 0,
    fat: 0,
    carb: 0,
  };

  const { energy, protein, fat, carb } = items.reduce((prev, curr) => {
    return {
      energy: prev.energy + curr.energy,
      protein: prev.protein + curr.protein,
      fat: prev.fat + curr.fat,
      carb: prev.carb + curr.carb,
    };
  }, initAmount);

  return (
    <div className="amount">
      <div className="amount-item">Калории: {energy}</div>
      <div className="amount-item">Белки: {protein}</div>
      <div className="amount-item">Жиры: {fat}</div>
      <div className="amount-item">Углеводы: {carb}</div>
    </div>
  );
}

export default Amount;
