package br.com.gersis.loopback.modelo;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.strongloop.android.loopback.Model;
import com.strongloop.android.remoting.BeanUtil;
import org.json.JSONObject;


public class Baby extends Model {


	private String email;
	private String nomeApelido;
	private String peso;
	private String altura;
	private String quadril;
	private String dataNascimento;
	// Relacionamentos 1
	// Relacionamentos N
	private List<RespostaFormulario> RespostaFormularios;
	private List<TracoBaby> TracoBabys;

	public JSONObject getJSON() {
		JSONObject obj = new JSONObject();
		try {
			obj.put("id",getId());
			obj.put("email", email);
			obj.put("nomeApelido", nomeApelido);
			obj.put("peso", peso);
			obj.put("altura", altura);
			obj.put("quadril", quadril);
			obj.put("dataNascimento", dataNascimento);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}


	public void setEmail(String valor) { 
		this.email = valor;
	}
	public String getEmail() { 
		return this.email;
	}
	public void setNomeApelido(String valor) { 
		this.nomeApelido = valor;
	}
	public String getNomeApelido() { 
		return this.nomeApelido;
	}
	public void setPeso(String valor) { 
		this.peso = valor;
	}
	public String getPeso() { 
		return this.peso;
	}
	public void setAltura(String valor) { 
		this.altura = valor;
	}
	public String getAltura() { 
		return this.altura;
	}
	public void setQuadril(String valor) { 
		this.quadril = valor;
	}
	public String getQuadril() { 
		return this.quadril;
	}
	public void setDataNascimento(String valor) { 
		this.dataNascimento = valor;
	}
	public String getDataNascimento() { 
		return this.dataNascimento;
	}

	public List<RespostaFormulario> getRespostaFormularios() {
		return  RespostaFormularios;
	}
	public void setRespostaFormularios(List<RespostaFormulario> valores) {
		this.RespostaFormularios = new ArrayList<RespostaFormulario>();
		for (int i = 0; i < valores.size(); i++) {
			Object objeto = new RespostaFormulario();
			if (valores.get(i) instanceof RespostaFormulario) {
				BeanUtil.setProperties(objeto, (Map<String, ? extends Object>) valores.get(i), true);
				this.RespostaFormularios.add((RespostaFormulario) objeto);
			} else {
				System.out.println("Outro tipo");
			}
		}
	}
	public List<TracoBaby> getTracoBabys() {
		return  TracoBabys;
	}
	public void setTracoBabys(List<TracoBaby> valores) {
		this.TracoBabys = new ArrayList<TracoBaby>();
		for (int i = 0; i < valores.size(); i++) {
			Object objeto = new TracoBaby();
			BeanUtil.setProperties(objeto, (Map<String, ? extends Object>) valores.get(i), true);
			this.TracoBabys.add((TracoBaby) objeto);
		}
	}
}
