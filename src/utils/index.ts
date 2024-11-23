import { MAX_FILES, MIN_FILES } from "@/constant";

export const validator = (
  length: number
): { msg: string; isValid: boolean } => {
  if (length < MIN_FILES) {
    return {
      msg: `You must upload at least ${MIN_FILES} file(s).`,
      isValid: false,
    };
  }
  if (length > MAX_FILES) {
    return {
      msg: `You can only upload up to ${MAX_FILES} files.`,
      isValid: false,
    };
  }

  return {
    msg: "",
    isValid: true,
  };
};
