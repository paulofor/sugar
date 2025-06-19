package br.com.gersis.loopback.modelo;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.strongloop.android.loopback.Model;
import com.strongloop.android.remoting.BeanUtil;
import org.json.JSONObject;


public class Experiencia extends Model {


	private String nome;
	private double valor;
	// Relacionamentos 1
	private Projeto Projeto;
	// Relacionamentos N
	private List<ItemCusto> ItemCustos;

	public void setId(Long id) {
		this.setIdObjeto(id);
	}
	public void setId(Integer id) {
		this.setIdObjeto(id);
	}

	public int getIdInteger() {
		return new Integer(getId().toString());
	}
	public long getIdLong() {
		return new Long(getId().toString());
	}

	public JSONObject getJSON() {
		JSONObject obj = new JSONObject();
		try {
			obj.put("id",getId());
			obj.put("nome", nome);
			obj.put("valor", valor);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}


	public void setNome(String valor) { 
		this.nome = valor;
	}
	public String getNome() { 
		return this.nome;
	}
	public void setValor(double valor) { 
		this.valor = valor;
	}
	public double getValor() { 
		return this.valor;
	}

	public Projeto getProjeto() {
		return Projeto;
	}
	public void setProjeto(HashMap valor) {
		this.Projeto = new Projeto();
		BeanUtil.setProperties(this.Projeto, (Map<String, ? extends Object>) valor, true);
	}
	public List<ItemCusto> getItemCustos() {
		return  ItemCustos;
	}
	public void setItemCustos(List<ItemCusto> valores) {
		this.ItemCustos = new ArrayList<ItemCusto>();
		for (int i = 0; i < valores.size(); i++) {
			Object objeto = new ItemCusto();
			System.out.println(" --> ObjetoMap ");
			BeanUtil.setProperties(objeto, (Map<String, ? extends Object>) valores.get(i), true);
			this.ItemCustos.add((ItemCusto) objeto);
		}
	}
}
