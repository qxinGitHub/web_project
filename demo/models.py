from django.db import models

# Create your models here.


class Trex(models.Model):
    name = models.CharField("名称",default="Anonymous",max_length=10)
    score = models.IntegerField(default=0,verbose_name='分数')
    date = models.DateTimeField(auto_now_add=True)
    address = models.GenericIPAddressField(blank=True,null=True)
    runningTime = models.FloatField(default=0)

    class Meta:
        verbose_name = "小恐龙"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name