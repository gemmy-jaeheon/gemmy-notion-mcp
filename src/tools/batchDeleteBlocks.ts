import { notion } from "../services/notion.js";
import { BatchDeleteBlocksParams } from "../types/blocks.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { APIResponseError } from "@notionhq/client";

export const batchDeleteBlocks = async (
  params: BatchDeleteBlocksParams
): Promise<CallToolResult> => {
  const results: Array<{
    blockId: string;
    success: boolean;
    response?: unknown;
    error?: string;
  }> = [];

  for (const blockId of params.blockIds) {
    try {
      const response = await notion.blocks.delete({
        block_id: blockId,
      });

      results.push({
        blockId,
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
        blockId,
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
        text: `Batch delete completed: ${succeeded} succeeded, ${failed} failed out of ${params.blockIds.length} operations`,
      },
      {
        type: "text",
        text: JSON.stringify(results, null, 2),
      },
    ],
    isError: failed > 0,
  };
};
