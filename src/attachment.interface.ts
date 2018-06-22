/**
 * At least 1 of the 3 optional parameters must be provided.
 * Files up to 25MB are allowed for tournaments hosted by Premier badge 
 * Challonge Premier subscribers.
 */
export interface matchAttachment {
  /**  A file upload (250KB max, no more than 4 attachments per match). If provided, the url parameter will be ignored.  */
  asset?: File;
  /**  A web URL  */
  url?: string;
  /**  Text to describe the file or URL attachment, or this can simply be standalone text.  */
  description?: string;
}
