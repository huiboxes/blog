import {
  getProviders,
  signIn,
  getCsrfToken,
  useSession
} from 'next-auth/react';
import { InferGetServerSidePropsType } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { CtxOrReq } from 'next-auth/client/_utils';

const SignIn = ({
  providers,
  csrfToken
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session]);

  return (
    <>
      <section className="h-screen">
        <div className="container px-6 py-12 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            {/* <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="Phone image"
              />
            </div> */}
            <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
              <form>
                {/* <div className="mb-6">
                  <input
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Email address"
                  />
                </div>

                <div className="mb-6">
                  <input
                    type="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Password"
                  />
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      id="exampleCheck3"
                      checked
                    />
                    <label
                      className="form-check-label inline-block text-gray-800"
                      for="exampleCheck2"
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href="#!"
                    className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  Sign in
                </button> */}

                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">
                    使用三方平台登录
                  </p>
                </div>
                
                {/* Google登录 */}
                <a
                  className="px-7 py-3 font-medium text-sm leading-snug uppercase rounded border-t  shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                  style={{ backgroundColor: '#fff' }}
                  href="#!"
                  role="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  onClick={() => signIn('google')}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Google"
                    role="img"
                    width="20px"
                    height="20px"
                    viewBox="0 0 512 512"
                    transform="translate(-2,-1)"
                  >
                    <path
                      fill="#4285f4"
                      d="M386 400c45-42 65-112 53-179H260v74h102c-4 24-18 44-38 57z"
                    />
                    <path
                      fill="#34a853"
                      d="M90 341a192 192 0 0 0 296 59l-62-48c-53 35-141 22-171-60z"
                    />
                    <path
                      fill="#fbbc02"
                      d="M153 292c-8-25-8-48 0-73l-63-49c-23 46-30 111 0 171z"
                    />
                    <path
                      fill="#ea4335"
                      d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55z"
                    />
                  </svg>
                  通过 Google 登录
                </a>

                {/* GitHub登录 */}
                <a
                  className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
                  style={{ backgroundColor: '#24292F' }}
                  href="#!"
                  role="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  onClick={() => signIn('github')}
                >
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    transform="translate(-3,-1)"
                  >
                    <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" fill="#fff" />
                  </svg>
                  通过 GitHub 登录
                </a>
                
              </form>
            </div>
          </div>
        </div>
      </section>

      {providers
        ? Object.values(providers).map((provider, i) => {
            if (provider.id !== 'email') {
              return (
                <div key={provider.name}>
                  <button onClick={() => signIn(provider.id)}>
                    {provider.name}
                  </button>
                </div>
              );
            }
          })
        : ''}
    </>
  );
};

export const getServerSideProps = async (context: CtxOrReq | undefined) => {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: { providers, csrfToken }
  };
};

export default SignIn;
