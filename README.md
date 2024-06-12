# Jess-bakers2
* always remember whenever using useSearchParams so wrap it in Suspense other wise by default the useSearchParams will make the entire page as client-side rendering, and it will also raise error at the deployment time. [read out it](https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout)
