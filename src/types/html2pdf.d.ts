declare module "html2pdf.js" {
  interface Html2PdfOptions {
    margin?: number | number[];
    filename?: string;
    image?: { type?: string; quality?: number };
    html2canvas?: Record<string, unknown>;
    jsPDF?: Record<string, unknown>;
    pagebreak?: { mode?: string[]; before?: string; after?: string; avoid?: string };
  }

  interface Html2PdfInstance {
    set(options: Html2PdfOptions): Html2PdfInstance;
    from(element: HTMLElement | null): Html2PdfInstance;
    save(): Promise<void>;
  }

  interface Html2PdfStatic {
    (): Html2PdfInstance;
    (): Html2PdfInstance;
  }

  const html2pdf: Html2PdfStatic;
  export default html2pdf;
}
