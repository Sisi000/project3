import { Container } from "react-bootstrap";
import Slider from "../components/Home/Slider";
import TryOn from "../components/Home/TryOn";
import SearchScreen from "./SearchScreen";


function HomeScreen() {
 
  return (
    <>
      <Container fluid style={{ padding: "0" }}>
        <Slider />
        <Container className="my-5 pt-5">
          <SearchScreen />
        </Container>
        <TryOn />
      </Container>
    </>
  );
}
export default HomeScreen;
