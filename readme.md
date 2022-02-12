#Example of using cluster module

The cluster module forks of new instances of the same application and automatically distributes incoming connections by using round-robin algorithm.

Start: node cluster.js

There's a blocking route **/block** and the cluster module helps to avoid blocking other requests.

Also, if one of the workers has died, a new instance of a worker will be created

If we deliberately want to kill a worker, we may send a SIGUSR2 signal. (kill -s SIGUSR2 process-pid)

Fork is a POSIX system call so it's intended for UNIX type OS. So if you are on a windows machine, you can test it by using Docker.

Just build an image: docker build  -t cluster-app . and run a container: docker run -it --rm -p 8080:3000 cluster-app

