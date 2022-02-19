import { createConnection, getConnection } from "typeorm";

let connectionReadyPromise: Promise<void> | null = null;

/**
 * in order **to solve issues with TypeORM and NextJS's Hot-module-reloading (HMR)** --
 * - use this function -- `await prepareDbConnection()` instead of awaiting createConnection() from TypeORM
 * - see link for more details: https://dev.to/unframework/getting-typeorm-to-work-with-next-js-and-typescript-1len
 * @returns `connectionReadyPromise` which you need to await
 */
async function prepareDbConnection() {
  // if no connection exists yet
  if (!connectionReadyPromise) {
    // create one
    connectionReadyPromise = (async () => {
      try {
        const staleConnection = getConnection();
        // and close it (to clean up references to outdated db connections)
        await staleConnection.close();
      } catch (err) {
        console.warn(err.message);
      }
      // before actually creating a *new* connection
      await createConnection();
    })();
  }

  return connectionReadyPromise;
}
