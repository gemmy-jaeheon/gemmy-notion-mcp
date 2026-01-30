import { notion } from "../services/notion.js";
import { BatchMixedOperationsParams } from "../types/blocks.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { APIResponseError } from "@notionhq/client";

export const batchMixedOperations = async (
  params: BatchMixedOperationsParams
): Promise<CallToolResult> => {
  const results: Array<{
    operation: string;
    blockId: string;
    success: boolean;
    response?: unknown;
    error?: string;
  }> = [];

  const operationCounts = {
    append: { total: 0, succeeded: 0 },
    update: { total: 0, succeeded: 0 },
    delete: { total: 0, succeeded: 0 },
  };

  for (const op of params.operations) {
    operationCounts[op.operation].total++;

    try {
      let response;

      switch (op.operation) {
        case "append":
          response = await notion.blocks.children.append({
            block_id: op.blockId,
            children: op.children,
          });
          break;

        case "update":
          response = await notion.blocks.update({
            block_id: op.blockId,
            ...op.data,
          });
          break;

        case "delete":
          response = await notion.blocks.delete({
            block_id: op.blockId,
          });
          break;
      }

      operationCounts[op.operation].succeeded++;
      results.push({
        operation: op.operation,
        blockId: op.blockId,
        success: true,
        response,
      });
    } catch (error) {
      const errorMessage =
        error instanceof APIResponseError
          ? `${error.code}: ${error.message}`
          : error instanceof Error
            ? error.message
            : String(error);

      results.push({
        operation: op.operation,
        blockId: op.blockId,
        success: false,
        error: errorMessage,
      });
    }
  }

  const totalSucceeded = results.filter((r) => r.success).length;
  const totalFailed = results.filter((r) => !r.success).length;

  const summary = Object.entries(operationCounts)
    .filter(([, counts]) => counts.total > 0)
    .map(([op, counts]) => `${op}: ${counts.succeeded}/${counts.total}`)
    .join(", ");

  return {
    content: [
      {
        type: "text",
        text: `Batch mixed operations completed: ${totalSucceeded} succeeded, ${totalFailed} failed (${summary})`,
      },
      {
        type: "text",
        text: JSON.stringify(results, null, 2),
      },
    ],
    isError: totalFailed > 0,
  };
};
