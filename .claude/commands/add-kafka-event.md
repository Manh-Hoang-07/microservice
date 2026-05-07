Them Kafka event (producer hoac consumer) cho service. Tham so: $ARGUMENTS

Neu $ARGUMENTS khong du, hoi nguoi dung:
1. Service nao? (vi du: comic-service)
2. Producer hay Consumer?
3. Topic name? (vi du: comic.chapter.published)
4. Mo ta event payload?

## Producer

### 1. Doc pattern hien co
- Tim service da co Kafka producer (vi du: auth-service, comic-service)
- Doc cach ho dung KafkaProducerService hoac outbox pattern

### 2. Dinh nghia event
- Tao interface cho event payload trong shared-types (neu can dung chung)
- Hoac trong service neu chi dung noi bo

### 3. Publish event
- Dung outbox pattern: ghi event vao DB truoc, relay len Kafka sau
- Goi `kafkaProducer.publish(topic, payload)` sau khi business logic thanh cong
- Dat trong afterCreate/afterUpdate hook cua BaseService

### 4. Cau hinh
- Dam bao `KAFKA_BROKERS` va `EVENT_DRIVER=kafka` trong .env
- Neu `EVENT_DRIVER=local`: event chi trong process, khong gui len Kafka

## Consumer

### 1. Doc pattern hien co
- Doc notification-service — day la consumer chinh
- Doc cach dang ky consumer, xu ly message, DLQ

### 2. Tao handler
- Tao file handler trong `src/kafka/handlers/` hoac tuong tu
- Implement logic xu ly message
- Xu ly loi: retry hoac gui DLQ

### 3. Dang ky consumer
- Them vao Kafka module cua service
- Cau hinh group ID, topic subscription

### 4. DLQ (Dead Letter Queue)
- Neu xu ly that bai nhieu lan → gui sang topic `<topic>.dlq`
- Log loi day du de debug
