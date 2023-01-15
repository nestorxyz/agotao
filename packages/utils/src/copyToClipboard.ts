interface CopyToClipboardOptions {
  text: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const copyToClipboard = async ({
  text,
  onSuccess,
}: CopyToClipboardOptions) => {
  try {
    await navigator.clipboard.writeText(text);
    onSuccess && onSuccess();
  } catch (err) {
    console.error("Failed to copy!", err);
  }
};
