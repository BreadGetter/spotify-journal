import { useParams } from "react-router-dom";
import Albums from "../components/Albums";

export default function HomePage() {
  const { user_id} = useParams();

  return (
    <Albums user_id={user_id}/>
  );
}