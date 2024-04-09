export function formatTimestamp(timestamp: Date | string) {
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short',
    };
    return date.toLocaleDateString(undefined, options); 
  }

export function formatMMDDTimestamp(timestamp: Date | string) {
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleDateString(undefined, options); 
  }