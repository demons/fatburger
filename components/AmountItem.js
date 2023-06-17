function AmountItem({ items = [] }) {
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
    <div className="amount-item">
      <div className="field">Калории: {energy}</div>
      <div className="field">Белки: {protein}</div>
      <div className="field">Жиры: {fat}</div>
      <div className="field">Углеводы: {carb}</div>
    </div>
  );
}

export default AmountItem;
