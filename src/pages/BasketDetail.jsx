import { useParams, Link } from "react-router-dom";
import { getOrderById } from "../services/basketApi";

export default function BasketDetail() {
  const { id } = useParams();
  const order = getOrderById(Number(id));

  if (!order) return <p>Заказ не найден</p>;

  return (
    <div>
      <h2>{order.title}</h2>

      <ul>
        {order.items.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>

      <Link to="/basket">⬅ Назад</Link>
    </div>
  );
}
