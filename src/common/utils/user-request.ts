interface UserRequestData {
  userId: number;
  email: string;
}

/**
 * Get user id from the request
 * @param request Request
 * @returns userId
 */
export async function getUserIdFromRequest(request: any): Promise<number> {
  const userId = request.user ? request.user.userId : null;
  return userId;
}

/**
 * Get user from the request
 * @param request Request
 * @returns user
 */
export async function getUserFromRequest(
  request: any
): Promise<UserRequestData> {
  return request.user;
}
