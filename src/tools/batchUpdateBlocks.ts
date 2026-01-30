import { notion } from "../services/notion.js";
import { BatchUpdateBlocksParams } from "../types/blocks.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { APIResponseError } from "@notionhq/client";

export const batchUpdateBlocks = async (
  params: BatchUpdateBlocksParams
): Promise<CallToolResult> => {
  const results: Array<{
    blockId: string;
    success: boolean;
    response?: unknown;
    error?: string;
  }> = [];

  for (const operation of params.operations) {
    try {
      const response = await notion.blocks.update({
        block_id: operation.blockId,
        ...operation.data,
      });

      results.push({
        blockId: operation.blockId,
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
        blockId: operation.blockId,
        success: false,
        error: errorMessage,
      });
    }
  }

  const succeeded = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success).length;

  return {
    content: [
      {
        type: "text",
        text: `Batch update completed: ${succeeded} succeeded, ${failed} failed out of ${params.operations.length} operations`,
      },
      {
        type: "text",
        text: JSON.stringify(results, null, 2),
      },
    ],
    isError: failed > 0,
  };
};
