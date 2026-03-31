import { apiClient } from "./axios";

const base = "/school";

const sessionBase = `${base}/student-session`;

// SESSIONS

const getSessions = ({ page, limit }: { page: number; limit: number }) => {
  return apiClient.get(`${sessionBase}?page=${page}&limit=${limit}`);
};

const getSessionTerm = (sessionId: string) => {
  return apiClient.get(`${sessionBase}/${sessionId}/term`);
};

// RESULTS
//
const resultBase = "/results";
const getMyResults = (studentsId: string, termId: string) => {
  return apiClient.post(`${resultBase}/me/${termId}/${studentsId}`);
};

export { getSessions, getSessionTerm, getMyResults };
