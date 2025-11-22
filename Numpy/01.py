import numpy as np
from scipy import stats

# a=[1,2,3]
# print(type(a))

# b=np.array([1,2,3])

# print(type(b))

# a=[1,2,3]
# a=np.array(a)
# print(type(a))

# b=[1,2,3]

# b=np.array([b])
# print(b.ndim)

# a=np.array([[[1,2,3],[4,5,6]]])

# print(a.shape)
# print(a.size)
# print(a.ndim)
# print(a.dtype)


# ide=np.eye(4)
# print(ide)

# zero array
zero=np.zeros((2,3))
print(zero)

# Ones array
ones=np.ones((3,4))
print("Ones = \n",ones)

# Full array
full=np.full((2,3),4)
print("Full=\n",full)

# Identity Matrix(Square matrix)
identity=np.eye(4)
print("identity=\n",identity)

# Empty Array (Generate random number as much you pass)

print(np.empty(2))

# Evenly Spaced Array (it will print 1,5 exclusive with the gap 2)

print(np.arange(1,5,2))

# specific value between range (it will print 1,10inclusice in 5 part)

print(np.linspace(1,10,5))

# random value array(It will print random value of type float in range 2,3)

print(np.random.rand(2,3))

#Random int array (it will print random number of shape 2,3 number between 1 to 10)

print(np.random.randint(1,10,(3,2)))

# slicing

a=np.array([1,2,3,4,5,6])
print(a[0])

# print(a[0:5:2]) it will print from 0 to 5th index 5th(exclusive) by 2 step

print(a[-3:])

# Array reshaping and flattening
arr1=np.array([1,2,3,4,5,6])
print(arr1.reshape((2,3)))

# Array flattening 

arr2=np.array([[1,2,3],[4,5,6]])
print(arr2.flatten())

# stacking 

x=np.array([1,2,4])
y=np.array([5,6,7])

print(np.hstack((x,y)))
print(np.vstack((x,y)))

# Mathemetical operations
p=np.array([10,20,30])
q=np.array([40,50,60])

print(p+q)
print(p-q)
print(p*q)
print(p/q)

print("Mean of p is ",np.mean(p))
print("median of p is ",np.median(p))
print("standard deviation of p is ",np.std(p))
print("Minimum value in p is",np.min(p))
print("Maximum value in p is",np.max(p))
print("sum of p is ",np.sum(p))