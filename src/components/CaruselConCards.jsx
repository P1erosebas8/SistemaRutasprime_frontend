import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";

function CarruselCards({ features }) {
    return (
        <>
            <div className="d-none d-md-block">
                <Carousel interval={3000} indicators={false}>
                    {features.reduce((acc, _, i) => {
                        if (i % 3 === 0) acc.push(features.slice(i, i + 3));
                        return acc;
                    }, []).map((group, index) => (
                        <Carousel.Item key={index}>
                            <div className="container">
                                <div className="row justify-content-center">
                                    {group.map((feature, idx) => (
                                        <div className="col-md-4" key={idx}>
                                            <Card className="h-100 text-center bg-dark text-white">
                                                <i className={`bi ${feature.icon}`} style={{ fontSize: "2.5rem" }}></i>
                                                <Card.Body>
                                                    <Card.Title>{feature.title}</Card.Title>
                                                    <Card.Text>{feature.text}</Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>

            <div className="d-block d-md-none">
                <Carousel interval={3000} indicators={false}>
                    {features.map((feature, idx) => (
                        <Carousel.Item key={idx}>
                            <Card className="h-100 text-center bg-dark text-white card-custom">
                                <i className={`bi ${feature.icon}`} style={{ fontSize: "2.5rem" }}></i>
                                <Card.Body>
                                    <Card.Title>{feature.title}</Card.Title>
                                    <Card.Text>{feature.text}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </>
    );
}

export default CarruselCards;
