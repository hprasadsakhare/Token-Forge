"use client";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/client";
import { inAppWallet } from "thirdweb/wallets";
import { sepolia } from "thirdweb/chains";
import { useAppContext } from "@/context/ContextAPI";
import InputField from "./component/InputField";

export default function Home() {
  const { activeAccount } = useAppContext();

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-purple-700 via-black to-gray-900 text-white flex items-center justify-center px-4 py-8 transition-all duration-500 ease-in-out">
      {activeAccount ? (
        <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-10 text-white">
          {/* Address */}
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-center mb-4">
              Connected Wallet: {activeAccount?.address.slice(0, 6)}...
              {activeAccount?.address.slice(-4)}
            </h1>
          </div>
          <InputField />
        </div>
      ) : (
        <div className="text-center max-w-xl">
          <h1 className="text-4xl font-extrabold mb-4">
            Welcome to the ERC20 Deployer 🚀
          </h1>
          <p className="text-lg mb-6 text-gray-300">
            Deploy your own token on Sepolia. Start by connecting your wallet.
          </p>
          <div className="inline-block">
            <ConnectButton
              client={client}
              accountAbstraction={{
                chain: sepolia,
                sponsorGas: true,
              }}
              wallets={[
                inAppWallet({
                  auth: {
                    options: ["email", "wallet"],
                  },
                }),
              ]}
            />
          </div>
        </div>
      )}
    </main>
  );
}
