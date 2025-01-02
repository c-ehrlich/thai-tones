import React from "react";

type NullOrUndefined = null | undefined;
type RemoveNullOrUndefined<T> = T extends NullOrUndefined ? never : T;

export function useRequiredContext<T>(context: React.Context<T>) {
  const value = React.useContext(context);

  if (value === null || value === undefined) {
    if (!context.displayName) {
      throw new Error(
        `useRequiredContext: Some context is null undefined, and the developer forgot to give that context a displayName. Bad developer!`
      );
    }
    throw new Error(
      `useRequiredContext: ${context.displayName} is null or undefined, but is required.`
    );
  }

  return value as RemoveNullOrUndefined<T>;
}
