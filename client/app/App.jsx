import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { postVote } from "./backend-api";
import image1 from "./female_01.png";
import image2 from "./male_09.png";
import image3 from "./female_08.png";
// <Card.Img variant="top" src={image1} />
// <Card.Img variant="top" src={require('./KwokKeeKum.png')} />
// <div class="cloud-header" />


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "" };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(ev) {
    console.log("this is:", this);
    console.log("event is:", ev);
    console.log("event type is:", ev.type);
    console.log("event currentTarget is:", ev.currentTarget);
    // this.setState({message: `Your vote for ${ev.currentTarget.value} is submitted!`});
    postVote(ev.currentTarget.value).then(result => {
      this.setState({ message: result.status });
    });
  }

  render() {
    return (
      <section>
        <header id="flex-header">
          
          <h1>IBM Cloud Polling App</h1>

          <Card className="text-center">
            <Card.Body>
            <Image src={image1} roundedCircle fluid className="align-self-center" width={100} height={100}/>
              <Card.Title>Minn Erva</Card.Title>
              <Card.Text>
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
              </Card.Text>
              <Button
                variant="danger"
                size="lg"
                block
                onClick={this.handleClick}
                value="red"
              >
                RED
              </Button>
            </Card.Body>
          </Card>

          <Card className="text-center">
            <Card.Body>
            <Image src={image2} roundedCircle fluid className="align-self-center" width={100} height={100}/>
              <Card.Title>Nick Fury</Card.Title>
              <Card.Text>
              "Neque cupiditate assumenda in maiores repudiandae mollitia architecto."
              </Card.Text>
              <Button
                variant="primary"
                size="lg"
                block
                onClick={this.handleClick}
                value="blue"
              >
                BLUE
              </Button>
            </Card.Body>
          </Card>

          <Card className="text-center">
            <Card.Body>
            <Image src={image3} roundedCircle fluid className="align-self-center" width={100} height={100}/>
              <Card.Title>Carol Danvers</Card.Title>
              <Card.Text>
                "Delectus impedit saepe officiis ab aliquam repellat rem unde ducimus."
              </Card.Text>
              <Button
                variant="success"
                size="lg"
                block
                onClick={this.handleClick}
                value="green"
              >
                GREEN
              </Button>
            </Card.Body>
          </Card>
        </header>
        <main>{this.state.message}</main>
      </section>
    );
  }
}
