import { useParams } from "react-router-dom";
import {
  Image,
  Typography,
  Descriptions,
  Divider,
  Button,
  Form,
  DatePicker,
  Carousel,
  Col,
  Row,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useCarSelector, useFilterSelector } from "../store/hooks.ts";

const { Title } = Typography;
const { RangePicker } = DatePicker;
const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "15rem",
  color: "black",
  lineHeight: "15rem",
  textAlign: "center",
};

const Car = () => {
  const filter = useFilterSelector((state) => state.filter);
  const { carId } = useParams();
  const cars = useCarSelector((state) => state.car.items);
  const selectedCar = cars.find((car) => car.carId === carId);

  if (!selectedCar) {
    return <p>Car not found</p>;
  }

  const carImages = [
    selectedCar.headerImage,
    ...(selectedCar.galleryImages || []),
  ];

  return (
    <div className="px-36 py-4">
      <Image.PreviewGroup items={carImages}>
        <Image
          src={selectedCar.headerImage}
          alt={`Image of ${selectedCar.make} ${selectedCar.model}`}
          style={{
            objectFit: "cover",
            maxHeight: "24rem",
            width: "100vw",
            borderRadius: "1rem",
          }}
        />
      </Image.PreviewGroup>

      <Row>
        <Col span={16}>
          <Title>{`${selectedCar.make} ${selectedCar.model}`}</Title>
          <Descriptions
            title="Hosted By"
            items={[
              {
                label: <UserOutlined />,
                children: "Hassan Kose",
              },
            ]}
          />
          <Descriptions
            title="Description"
            items={[
              {
                children:
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
              },
            ]}
          />
        </Col>
        <Col span={8} className="flex flex-col items-center">
          <Row>
            <Title level={2} className="text-center">
              {`$${selectedCar.price} total`}
            </Title>
          </Row>
          <Divider />
          <Row>
            <Form
              id="filter-form"
              name="filter"
              initialValues={{ remember: true }}
            >
              <Form.Item name="dateRange" id="dateRange">
                <RangePicker
                  id="dateRangePicker"
                  placeholder={[filter.startDate, filter.endDate]}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  className="mt-2 w-full"
                  type="primary"
                  htmlType="submit"
                  id="submitButton"
                >
                  Checkout
                </Button>
              </Form.Item>
            </Form>
          </Row>
          <Divider />
          <Row>
            <div className="w-60 h-60 bg-white">
              <Carousel fade arrows={true} infinite={false}>
                <div>
                  <Title
                    level={2}
                    style={contentStyle}
                    className="bg-purple-900"
                  >
                    1
                  </Title>
                </div>
                <div>
                  <Title level={2} style={contentStyle} className="bg-red-700">
                    2
                  </Title>
                </div>
              </Carousel>
            </div>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Car;
