# test1

## P1. PyTorch环境的配置及安装
- Anaconda的安装，显卡驱动（CUDA），PyTorch的安装
- 较为基础，这里不做过多记录，仅对一些常用命令做一下记录：
```shell
conda --version
conda creat -n 环境名 python=3.6

conda activate 环境名
conda deactivate

conda list
conda install

pip list
pip install

nvidia-smi
```
```python
import torch
torch.cuda.is_available()
```
## P2. Python编辑器的选择、安装及配置
- PyCharm的下载、安装，Jupyter的安装，不做过多记录
- 在新环境中安装jupyter：conda install nb_conda或conda install nb_conda_kernels
## 【FAQ】为什么torch.cuda.is_available返回False
> 【FAQ】为什么torch.cuda.is_available返回False：检查GPU是否支持CUDA，检查显卡驱动版本
> 【FAQ】conda安装太慢，无法使用本地包：conda install --use-local 包名字（本地包放到Anaconda安装目录的pkgs文件夹下）
## P3. Python学习中的两大法宝函数
- package（例如PyTorch）相当于工具箱，用dir()打开操作
- package中的函数（方法）相当于工具，用help()查看说明书
```python
dir(torch)
dir(torch.cuda)
help(torch.cuda.is_available)    #注意is_available不带括号
```
## P4. PyCharm及Jupyter使用及对比
- 不做过多记录，主要还是在讲PyCharm、Python控制台、Jupyter中Python代码运行的区别
## P5. PyTorch加载数据初认识
- 不同数据集有不同的组织形式，所有数据集都需要继承Dataset类
- 导入：from torch.utils.data import Dataset，可以通过help(Dataset)查看其具体说明
- 所有子类都需要重写\_\_getitem\_\_方法，还可以重写\_\_len\_\_
- Dataset：提供一种方式去获取数据及其label，主要实现两个功能：
  - 如何获取每一个数据及其label（\_\_getitem\_\_）
  -  告诉我们总共有多少个数据（\_\_len\_\_）
- Dataloader：打包（batch_size）为后面的神经网络提供不同的数据形式
## P6. Dataset类代码实战
- 读取图片的两种方法：
```python
img_path = "hymenoptera_data/train/ants_image/swiss-army-ant.jpg"

# 法1：利用PIL读取图片，获得PIL类型图片数据
from PIL import Image
img = Image.open(img_path)

# 法2：利用opencv读取图片，获得numpy类型图片数据
import cv2
cv_img = cv2.imread(img_path)
```
- 路径拼接：path_name = os.path.join(path_name_1, path_name_2)
- 把路径下的文件名变成一个列表：path_list = os.listdir(path_name)
- 完整代码：
```python
from torch.utils.data import Dataset
import os
from PIL import Image

class MyData(Dataset):
    def __init__(self, root_dir, label_dir):
        self.root_dir = root_dir
        self.label_dir = label_dir
        self.path = os.path.join(self.root_dir, self.label_dir)
        self.img_path = os.listdir(self.path)
        
    def __getitem__(self, idx):
        img_name = self.img_path[idx]
        img_item_path = os.path.join(self.root_dir, self.label_dir, img_name)
        img = Image.open(img_item_path)
        label = self.label_dir
        return img, label
    
    def __len__(self):
        return len(self.img_path)
        
root_dir = "hymenoptera_data/train"
ants_label_dir = "ants"
bees_label_dir = "bees"
ants_dataset = MyData(root_dir, ants_label_dir)
bees_dataset = MyData(root_dir, bees_label_dir)
train_dataset = ants_dataset + bees_dataset
```
```python
import os

root_dir = "hymenoptera_data/train"
target_dir = "ants_image"
image_path = os.listdir(os.path.join(root_dir, target_dir))
label = target_dir.split('_')[0]
out_dir = "ants_label"

for i in image_path:
    file_name = i.split('.jpg')[0]
    with open(os.path.join(root_dir, out_dir, "{}.txt".format(file_name)), "w") as f:
        f.write(label)
```
## P7. TensorBoard的使用（一）
- TensorBoard可以用来观察训练过程中loss的变化和模型在不同阶段的输出
- 安装：pip install tensorboard
- 用于可视化训练过程，使用步骤：
  - 导入：from torch.utils.tensorboard import SummaryWriter
  - 初始化：writer = SummaryWriter("目录名称")
  - 写入标量：add_scalar(标题, y轴数值, x轴数值)
  - 关闭：close()
- 启动：tensorboard --logdir=目录名称 --port=端口名
> 在矩池云中使用TensorBoard：
> - 配置端口：在租用机器时，展开高级选项，在自定义端口中，新增一个端口配置，为 HTTP-6006
> - 启动TensorBoard：在需要使用 TensorBoard 时，输入命令tensorboard --logdir=目录名称 --bind_all
> - 访问TensorBoard：点击租用列表里自定义的 HTTP 链接，即可打开 Tensorboard
```python
from torch.utils.tensorboard import SummaryWriter
writer = SummaryWriter("logs")
# y=x^2
for i in range(100):
    writer.add_scalar("y=x^2", i**2, i)
writer.close()
```
![image-1689172272269](/img/pytorch/image-1689172272269.png)
## P8. TensorBoard的使用（二）
- 写入图像：add_image(标题, img_tensor, step)
- img_tensor支持tensor或numpy类型，默认是3\*H\*W，如不一致需用dataformats='HWC'指定
```python
from PIL import Image
import numpy as np
from torch.utils.tensorboard import SummaryWriter

image_path = "hymenoptera_data/train/ants_image/swiss-army-ant.jpg"
img_PIL = Image.open(image_path)
img_array = np.array(img_PIL)

print(type(img_array))    # 查看类型是否为tensor或numpy
print(img_array.shape)    # 查看形状是否为3*H*W

writer = SummaryWriter("logs")
writer.add_image("test", img_array, 1, dataformats='HWC')
writer.close()
```
![image-1689174350179](/img/pytorch/image-1689174350179.png)
## P9. Transforms的使用（一）
- 在transforms.\py（工具箱）中定义了很多类（工具模板），用于对图像进行不同的变换，使用步骤：
  - 导入：from torchvision import transforms
  - 初始化：transform = transforms.Compose([
					transforms.CenterCrop(10),
                    transforms.ToTensor()
					])（从工具箱中创建具体的工具）
   - 调用：image = transform(image)（使用工具）
```python
from PIL import Image
from torchvision import transforms

img_path = "hymenoptera_data/train/ants_image/swiss-army-ant.jpg"
img = Image.open(img_path)
print(type(img))

tensor_trans = transforms.ToTensor()
tensor_img = tensor_trans(img)
print(type(tensor_img))
```
## P10. Transforms的使用（二）
> 为什么需要Tensor数据类型：Tensor数据类型包装了一些神经网络所需要的特性，如_backward_hooks、\_grad等
> transforms.ToTensor()之后格式已经是3\*H\*W，因此在使用TensorBoard时不需要指定dataformats
- 本节主要是把前面所讲的串起来
```python
from PIL import Image
from torchvision import transforms
from torch.utils.tensorboard import SummaryWriter

img_path = "hymenoptera_data/train/ants_image/swiss-army-ant.jpg"
img = Image.open(img_path)

tensor_trans = transforms.ToTensor()
tensor_img = tensor_trans(img)
print(tensor_img.shape) 

writer = SummaryWriter("logs")
writer.add_image("Tensor_img", tensor_img, 1)
writer.close()
```
## 常见的Transforms（一）
> Python中__call__的用法：实例化的对象名后面加括号以及所需的参数调用，实际是调用类中定义的__call__()方法中的内容
```python
class Person:
    def __call__(self, name):
        print("__call__" + "Hello, " + name)
    def hello(self, name):
        print("hello, "+ name)
        
person = Person()
person("zhangsan")
person.hello("lisi")
```
- ToTensor()、ToPILImage()
- Normalize([mean], [std])：output = (input - mean) / std
```python
from PIL import Image
from torch.utils.tensorboard import SummaryWriter
from torchvision import transforms

writer = SummaryWriter("logs")
img = Image.open("hymenoptera_data/train/ants_image/swiss-army-ant.jpg")

# ToTensor
trans_totensor = transforms.ToTensor()
img_tensor = trans_totensor(img)
writer.add_image("ToTensor", img_tensor)

# Normalize
print(img_tensor[0][0][0])
trans_norm = transforms.Normalize([0.5, 0.5, 0.5], [0.5, 0.5, 0.5])
img_norm = trans_norm(img_tensor)
print(img_norm[0][0][0])
writer.add_image("Normalize", img_norm)

writer.close()
```
![image-1689183425490](/img/pytorch/image-1689183425490.png)
## 常见的Transforms（二）
- Resize((h, w))或Resize(int)，一种是按(h, w)缩放，一种是最小边匹配int等比缩放，不改变高宽比例
```python
from PIL import Image
from torch.utils.tensorboard import SummaryWriter
from torchvision import transforms

writer = SummaryWriter("logs")
img = Image.open("hymenoptera_data/train/ants_image/swiss-army-ant.jpg")

# Resize
print(img.size)
trans_resize = transforms.Resize((256, 512))
img_resize = trans_resize(img)
print(img_resize.size)

# ToTensor
trans_totensor = transforms.ToTensor()
img_resize = trans_totensor(img_resize)
writer.add_image("Resize",img_resize, 0)

writer.close()
```
![image-1689248644598](/img/pytorch/image-1689248644598.png)
- Compose([transforms1, transforms2])
```python
from PIL import Image
from torch.utils.tensorboard import SummaryWriter
from torchvision import transforms

writer = SummaryWriter("logs")
img = Image.open("hymenoptera_data/train/ants_image/swiss-army-ant.jpg")

# Compose
print(img.size)
trans_resize_2 = transforms.Resize(100)
trans_totensor = transforms.ToTensor()
trans_compose = transforms.Compose([trans_resize_2, trans_totensor])
img_resize_2 = trans_compose(img)
print(img_resize_2.shape)
writer.add_image("Resize", img_resize_2, 1)

writer.close()
```
![image-1689248677701](/img/pytorch/image-1689248677701.png)
- RandomCrop
```
from PIL import Image
from torch.utils.tensorboard import SummaryWriter
from torchvision import transforms

writer = SummaryWriter("logs")
img = Image.open("hymenoptera_data/train/ants_image/swiss-army-ant.jpg")

# RandomCrop
trans_random = transforms.RandomCrop(100)
trans_totensor = transforms.ToTensor()
trans_compose_2 = transforms.Compose([trans_random, trans_totensor])
for i in range(10):
    img_crop = trans_compose_2(img)
    writer.add_image("RandomCrop", img_crop, i)
    
writer.close()
```
![image-1689249641313](/img/pytorch/image-1689249641313.png)
- 关注输入和输出数据类型，多看官方文档
- 关注方法需要什么参数
- 不知道返回值类型的时候，可以print、print(type())、debug
## torchvision中的数据集使用
- PyTorch核心模块，torchaudio/torchtext/torchvision分别针对语音/文本/图像
- torchvision中包含datasets模块（数据集）、models模块（常见的神经网络）、transforms模块、utils（小工具，如TensorBoard）
- 本节主要是讲解torchvision.datasets模块，将数据集和前面的transforms结合
> CIFAR-10数据集：6万张32×32彩色图片，10个类别，每类6k张，5w张训练，1w张测试
```python
import torchvision
from torch.utils.tensorboard import SummaryWriter

dataset_transform = torchvision.transforms.Compose([torchvision.transforms.ToTensor()])
train_set = torchvision.datasets.CIFAR10(root="./dataset", train=True, transform=dataset_transform, download=True)
test_set = torchvision.datasets.CIFAR10(root="./dataset", train=False, transform=dataset_transform, download=True)
print(test_set.classes)

writer = SummaryWriter("cifar10")
for i in range(10):
    img, target = test_set[i]
    writer.add_image("test_set", img, i)
writer.close()
```
![image-1689251915235](/img/pytorch/image-1689251915235.png)
## DataLoader的使用
- dataset相当于打扑克的扑克牌，dataloader相当于通过参数设置每次去扑克牌中取几张牌
- 导入：from torch.utils.data import DataLoader
- 参数：
  - dataset：传入的数据集
  - batch_size：每次取几张牌，默认1
  - shuffle：每一轮抓牌后是否洗牌，默认False
  - num_workers：加载数据时的多进程，默认0
  - drop_last：每一轮最后一次抓牌数目不够是否舍弃，默认False
- DataLoader每迭代一次，实际是去dataset中取batch_size个数据然后进行一个打包
> Python中__getitem__的用法：实例化的对象名后面加方括号[]以及index，实际是调用类中定义的__getitem__()方法中的内容
```python
import torchvision
from torch.utils.data import DataLoader
from torch.utils.tensorboard import SummaryWriter

test_data = torchvision.datasets.CIFAR10("./dataset", train=False, transform=torchvision.transforms.ToTensor())
test_loader = DataLoader(dataset=test_data, batch_size=64, shuffle=True, num_workers=0, drop_last=False)

writer = SummaryWriter("dataloader")
for epoch in range(2):
    step = 0
    for data in test_loader:
        imgs, targets = data
        writer.add_images("Test_Data_Epoch: {}".format(epoch), imgs, step)    # 注意这里用的是add_images
        step = step + 1
writer.close()
```
![image-1689254148462](/img/pytorch/image-1689254148462.png)

## 神经网络的基本骨架nn.Module的使用
```python
import torch
from torch import nn

class Tudui(nn.Module):
    def __init__(self):
        super().__init__()
        
    def forward(self, input):
        output = input + 1
        return output

tudui = Tudui()
x = torch.tensor(1.0)
output = tudui(x)
print(output)
```