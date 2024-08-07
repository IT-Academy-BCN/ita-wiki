/**
 * Generated by @openapi-codegen
 *
 * @version 0.18.3
 */
export type DniError = {
  /**
   * @example dni already exists
   */
  message: string;
};

export type EmailError = {
  /**
   * @example email already exists
   */
  message: string;
};

export type InputError = {
  /**
   * @example Input is not a string
   */
  message: string;
};

export type MissingTokenError = {
  /**
   * @example Missing token
   */
  message: string;
};

export type InvalidTokenError = {
  /**
   * @example Token is not valid
   */
  message: string;
};

export type ForbiddenError = {
  /**
   * @example Only active users can login
   */
  message: string;
};

export type MissingUserError = {
  /**
   * @example User not found
   */
  message: string;
};

export type UpstreamServiceFail = {
  /**
   * @example Upstream service failed to respond with the required data
   */
  message: string;
};

export type ServiceUnavailableError = {
  /**
   * @example Service Unavailable
   */
  message: string;
};

export type ValidationError = {
  message: {
    /**
     * @example invalid_string
     */
    code: string;
    /**
     * @example Invalid
     */
    message: string;
    path: string[];
    /**
     * @example regex
     */
    validation?: string;
    /**
     * @example string
     */
    expected?: string;
    /**
     * @example undefined
     */
    received?: string;
    /**
     * @example BLOG
     * @example VIDEO
     * @example TUTORIAL
     */
    options?: string[];
  }[];
};
