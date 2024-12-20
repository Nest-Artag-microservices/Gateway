import 'dotenv/config';
import * as joi from 'joi';

interface EnvConfig {
    PORT: number;
   // PRODUCTS_MICROSERVICE_HOST: string;
   // PRODUCTS_MICROSERVICE_PORT: number
   // ORDERS_MICROSERVICE_HOST: string;
   // ORDERS_MICROSERVICE_PORT: number
   NATS_SERVERS: string[];
}

const envVarsSchema = joi.object({
    PORT: joi.number().required(),
   // PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
   // PRODUCTS_MICROSERVICE_PORT: joi.number().required(),
   // ORDERS_MICROSERVICE_HOST: joi.string().required(),
   // ORDERS_MICROSERVICE_PORT: joi.number().required(),
   NATS_SERVERS: joi.array().items( joi.string() ).required(),
})
.unknown(true);

const { error, value } = envVarsSchema.validate(
    {...process.env,
        NATS_SERVERS: process.env.NATS_SERVERS?.split(',')
}
);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
const envVars: EnvConfig = value;

export const envs={
port: envVars.PORT,
//productMicroserviceHost: envVars.PRODUCTS_MICROSERVICE_HOST,
//productMicroservicePort: envVars.PRODUCTS_MICROSERVICE_PORT,
//orderMicroserviceHost: envVars.ORDERS_MICROSERVICE_HOST,
//orderMicroservicePort: envVars.ORDERS_MICROSERVICE_PORT,
natsServers: envVars.NATS_SERVERS

}