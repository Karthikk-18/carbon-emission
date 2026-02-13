import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";
import {StdioServerTransport} from "@modelcontextprotocol/sdk/server/stdio.js";
import {z} from "zod";
import { calculateCarbonStats } from "./cec-logic.js";

const server = new McpServer({
    name: "carbon-calculator",
    version: "1.0.0"
});

server.tool(
    "calculate_emissions",
    "Calculate yearly carbon footprint",
    {
        electricityUsageKwh: z.number().nonnegative(),
        transportationUsagePerMonth: z.number().nonnegative(),
        shortFlight: z.number().nonnegative(),
        mediumFlight: z.number().nonnegative(),
        largeFlight: z.number().nonnegative(),
        dietaryChoice: z.enum(["vegetarian", "non_vegetarian"])
    },
    async(args) => {
        const result = calculateCarbonStats(args);

        return{
           content : [{
             type: "text",
             text: JSON.stringify(result, null, 2)
           }],  
        };
    }
);

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("MCP server is running on Stdio ")
}

main();