export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.svg$": "<rootDir>/__mocks__/fileMock.js",
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.app.json", // ← ここを明示
      isolatedModules: true          // 任意、型チェックを分離して高速化
    }
  },
};