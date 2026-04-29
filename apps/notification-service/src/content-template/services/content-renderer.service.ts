import { Injectable } from '@nestjs/common';

@Injectable()
export class ContentRendererService {
  render(content: string, variables: Record<string, any>): string {
    return content.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (match, key: string) => {
      const parts = key.split('.');
      let value: any = variables;
      for (const part of parts) {
        if (value === null || value === undefined) return match;
        value = value[part];
      }
      return value !== null && value !== undefined ? String(value) : match;
    });
  }
}
